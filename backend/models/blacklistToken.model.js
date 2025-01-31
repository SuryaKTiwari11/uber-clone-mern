import mongoose from "mongoose";

//create schema for blacklistToken jwt tokens and have ttl of 24 hours
const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const blacklistTokenModel = mongoose.model(
  "blacklistToken",
  blacklistTokenSchema
);
export default blacklistTokenModel;

/*
The blacklistTokenSchema is created to store JWT tokens that have been invalidated or blacklisted. This is important for several reasons:

Security: When a user logs out or a token is compromised, adding the token to a blacklist ensures that it cannot be used again, even if it is still within its valid time frame.

Token Revocation: JWT tokens are stateless and do not have a built-in mechanism for revocation. By maintaining a blacklist, you can effectively revoke tokens by checking if they are in the blacklist before allowing access to protected resources.

Session Management: In scenarios where you need to manage user sessions, blacklisting tokens helps in ensuring that once a user logs out, their session is effectively terminated.

Compliance: For applications that require strict compliance with security standards, maintaining a blacklist of invalidated tokens helps in meeting those requirements.

By using the blacklistTokenSchema, you can store tokens that should no longer be accepted and set an expiration time (TTL) for these tokens to automatically remove them after a certain period (e.g., 24 hours). This helps in keeping the blacklist manageable and ensures that old tokens are eventually removed.
*/
