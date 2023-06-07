const jwt = require("jsonwebtoken");
const { HTTPError, withTransactions, errorHandler } = require("../error/index");
const model = require("../model/index");
const bcrypt = require("bcryptjs");

const generateRefreshToken = (user, refreshId) => {
    const refreshToken = jwt.sign(
        { user: user, tokenId: refreshId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" },
    );

    return refreshToken;
};

const generateAccessToken = (user, isAdmin) => {
    const accessToken = jwt.sign({ user: user, isAdmin: isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2h",
    });

    return accessToken;
};

async function validateRefreshToken(token) {
    const decodeToken = () => {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw new HTTPError(401, "Unauthorized");
        }
    };

    const decodedToken = decodeToken();
    const tokenExist = await model.RefreshToken.exists({
        _id: decodedToken.tokenId,
    });
    if (tokenExist) {
        return decodedToken;
    } else {
        throw new HTTPError(401, "Unauthorized");
    }
}

// Middleware to authenticate the refresh token
const newRefreshToken = errorHandler(
    withTransactions(async (req, res, session) => {
        const currentRefreshToken = await validateRefreshToken(
            req.body.refreshToken,
        );
        const refreshTokenDoc = new model.RefreshToken({
            user: currentRefreshToken.user,
        });

        await refreshTokenDoc.save({ session });
        await model.RefreshToken.deleteOne({ _id: currentRefreshToken.tokenId }, { session });

        const refreshToken = generateRefreshToken(
            currentRefreshToken.user,
            refreshTokenDoc.id,
        );
        const accessToken = generateAccessToken(currentRefreshToken.user, currentRefreshToken.isAdmin);

        return { id: currentRefreshToken.user, accessToken, refreshToken };
    }),
);

const newAccessToken = errorHandler(async (req, res, session) => {
    const refreshToken = await validateRefreshToken(req.body.refreshToken);
    const accessToken = generateAccessToken(refreshToken.user, refreshToken.isAdmin);

    return {
        id: refreshToken.user,
        accessToken,
        refreshToken: req.body.refreshToken,
    };
});

const signUp = errorHandler(
    withTransactions(async (req, res, session) => {
        const { firstName, lastName, email, password, city, stressAddress, state, zipCode, country, isAdmin } = req.body;

        const existingUser = await model.User.findOne({ email });

        if (existingUser) throw new HTTPError(409, "User already exists....");

        const hashedPassword = await bcrypt.hash(password, 12);

        const userDoc = new model.User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            city,
            stressAddress,
            state,
            country,
            zipCode, isAdmin
        });

        const refreshDoc = new model.RefreshToken({
            user: userDoc.id,
        });

        await refreshDoc.save({ session });
        await userDoc.save({ session });

        const refreshToken = generateRefreshToken(userDoc.id, refreshDoc.id);
        const accessToken = generateAccessToken(userDoc.id, userDoc.isAdmin);

        return {
            id: userDoc.id,
            refreshToken,
            accessToken,
        };
    }),
);

const signIn = errorHandler(
    withTransactions(async (req, res, session) => {
        const { email, password } = req.body;
        const userDoc = await model.User.findOne({ email });

        if (!userDoc) throw new HTTPError(409, "User do not exist!!");

        const isCorrectPassword = await bcrypt.compare(
            password,
            userDoc.password,
        );

        if (!isCorrectPassword)
            throw new HTTPError(409, "Invalid password, try aagain!!");

        const refreshDoc = new model.RefreshToken({
            user: userDoc.id,
        });

        await refreshDoc.save({ session });

        const refreshToken = generateRefreshToken(userDoc.id, refreshDoc.id);
        const accessToken = generateAccessToken(userDoc.id, userDoc.isAdmin);

        return {
            id: userDoc.id,
            refreshToken,
            accessToken,
        };
    })
);

const logOut = errorHandler(withTransactions(async (req, res, session) => {
    const refreshToken = await validateRefreshToken(req.body.refreshToken);

    await model.RefreshToken.deleteOne({ _id: refreshToken.tokenId }, { session });

    return { message: "Logged out successfully" }
}))

const updateUser = errorHandler(withTransactions(async (req, res, session) => {
    const { params: { id: user } } = req
    const userDoc = await model.User.findOneAndUpdate({ _id: user }, { $set: req.body }, { new: true })
    await userDoc.save({ session })

    return userDoc

}))

const deleteUser = errorHandler(async (req, res, next) => {
    const { params: { id: user } } = req
    const userDoc = await model.User.findByIdAndDelete(user)
    return userDoc
})

const me = errorHandler(async (req, res) => {
    const userDoc = await model.User.findById(req.user).exec()
    if (!userDoc) { throw new HTTPError(400, " User not found") }

    return userDoc
})

const usersCount = errorHandler(async (req, res, next) => {
    const userDoc = await model.User.countDocuments()

    return userDoc
})

const getAllUsers = errorHandler(async (req, res, next) => {
    const userDoc = await model.User.find({})

    return userDoc
})

module.exports = {
    signIn,
    signUp,
    newRefreshToken,
    newAccessToken,
    me,
    logOut,
    usersCount,
    getAllUsers,
    deleteUser,
    updateUser
};
