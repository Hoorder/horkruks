export const sessionOptions = {
    password: process.env.SESSION_SECRET,
    cookieName: process.env.SESSION_NAME,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};
