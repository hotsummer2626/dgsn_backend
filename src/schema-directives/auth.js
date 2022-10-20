const { defaultFieldResolver } = require("graphql");
const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");
const { AuthenticationError } = require("apollo-server-express");
const { validateToken } = require("../utils/jwt");

function authDirective(directiveName) {
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        let authDirective = getDirective(schema, fieldConfig, directiveName);
        if (authDirective) {
          authDirective = authDirective[0];
        }
        if (authDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async function (parent, args, context, info) {
            const { authHeader } = context;
            if (!authHeader) {
              throw new AuthenticationError("Unauthorized");
            }
            const contentArr = authHeader.split(" ");
            if (contentArr.length !== 2 || contentArr[0] !== "Bearer") {
              throw new AuthenticationError("Invalid header format");
            }
            const decoded = validateToken(contentArr[1]);
            if (!decoded) {
              throw new AuthenticationError("Invalid token");
            }
            context.decoded = decoded;
            const result = await resolve(parent, args, context, info);
            return result;
          };
          return fieldConfig;
        }
      },
    });
}

module.exports = authDirective;
