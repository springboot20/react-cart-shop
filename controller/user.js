const jwt = require("jsonwebtoken");
const { HTTPError, withTransactions, errorHandler } = require("../error/index");
const model = require("../model/index");
const bcrypt = require("bcryptjs");

const generateRefreshToken = (userId, refreshId) => {
    const refreshToken = jwt.sign(
        { userId: userId, tokenId: refreshId },
        "REFRESH_TOKEN_SECRET",
        { expiresIn: "30d" },
    );

    return refreshToken;
};

const generateAccessToken = (userId) => {
    const accessToken = jwt.sign({ userId: userId }, "ACCESS_TOKEN_SECRET", {
        expiresIn: "5m",
    });

    return accessToken;
};

async function validateRefreshToken(token) {
    const decodeToken = () => {
        try {
            return jwt.verify(token, "REFRESH_TOKEN_SECRET");
        } catch (error) {
            return error.message;
        }
    };

    const decodedToken = decodeToken();
    const tokenExist = await model.RefreshToken.exists({
        _id: decodedToken.tokenId,
    });
    if (tokenExist) {
        return decodedToken;
    } else {
        return new HTTPError(401, "Unauthorized");
    }
}

// Middleware to authenticate the refresh token
const newRefreshToken = errorHandler(
    withTransactions(async (req, res, session) => {
        const currentRefreshToken = await validateRefreshToken(
            req.body.refreshToken,
        );
        const refreshTokenDoc = new model.RefreshToken({
            userId: currentRefreshToken.userId,
        });

        await refreshTokenDoc.save({ session });
        await model.RefreshToken.deleteOne({ id: currentRefreshToken.tokenId });

        const refreshToken = generateRefreshToken(
            currentRefreshToken.userId,
            refreshTokenDoc.id,
        );
        const accessToken = generateAccessToken(currentRefreshToken.userId);

        return { id: currentRefreshToken.userId, accessToken, refreshToken };
    }),
);

const newAccessToken = errorHandler(
    withTransactions(async (req, res, session) => {
        const refreshToken = await validateRefreshToken(req.body.refreshToken);
        const accessToken = generateAccessToken(refreshToken.userId);

        return {
            id: refreshToken.userId,
            accessToken,
            refreshToken: req.body.refreshToken,
        };
    }),
);

const signUp = errorHandler(
    withTransactions(async (req, res, session) => {
        const { firstname, lastname, email, password } = req.body;
        const existingUser = await model.User.findOne({ email });

        if (existingUser) throw new HTTPError(409, "User already exists....");

        const hashedPassword = await bcrypt.hash(password, 12);

        const userDoc = new model.User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        const refreshDoc = new model.RefreshToken({
            userId: userDoc.id,
        });

        await refreshDoc.save({ session });
        await userDoc.save({ session });

        const refreshToken = generateRefreshToken(userDoc.id, refreshDoc.id);
        const accessToken = generateAccessToken(userDoc.id);

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
            userId: userDoc.id,
        });

        await refreshDoc.save({ session });

        const refreshToken = generateRefreshToken(userDoc.id, refreshDoc.id);
        const accessToken = generateAccessToken(userDoc.id);

        return {
            id: userDoc.id,
            refreshToken,
            accessToken,
        };
    })
);

const logOut = errorHandler(withTransactions(async (req, res, session) => {

}))

const me = errorHandler(async (req, res) => {
    const userDoc = await model.User.findById(req.userId).exec()
    if (!userDoc) { throw new HTTPError(400, " User not found") }

    return userDoc
})
module.exports = {
    signIn,
    signUp,
    newRefreshToken,
    newAccessToken,
    me, logOut
};
