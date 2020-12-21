import ts from "typescript";
import { ProtoMessage, ProtoRegistry } from "../protoTypes";
import { createDslExportConstStmt, gqlTypeName } from "./util";
import { createFieldDefinitionStmt } from "./field";

/**
 * @example
 * ```ts
 * export cosnt HelloInput = inputObjectType({
 *   name: "HelloInput",
 *   // ...
 * })
 * ```
 */
export function createInputObjectTypeDslStmts(
  msgs: ReadonlyArray<ProtoMessage>,
  reg: ProtoRegistry
): ts.Statement[] {
  return msgs.map((m) => createInputObjectTypeDslStmt(m, reg));
}

/**
 * @example
 * ```ts
 * export cosnt Hello = inputObjectType({
 *   name: "HelloInput",
 *   // ...
 * })
 * ```
 */
function createInputObjectTypeDslStmt(
  msg: ProtoMessage,
  reg: ProtoRegistry
): ts.Statement {
  const typeName = `${gqlTypeName(msg)}Input`;
  return createDslExportConstStmt(
    typeName,
    ts.factory.createCallExpression(
      ts.factory.createIdentifier("inputObjectType"),
      undefined,
      [
        ts.factory.createObjectLiteralExpression(
          [
            ts.factory.createPropertyAssignment(
              "name",
              ts.factory.createStringLiteral(typeName)
            ),
            ts.factory.createPropertyAssignment(
              "description",
              ts.factory.createStringLiteral(msg.description)
            ),
            createInputObjectTypeDefinitionMethodDecl(msg, reg),
          ],
          true
        ),
      ]
    )
  );
}

/**
 * @example
 * ```ts
 * definition(t) {
 *   // ...
 * }
 * ```
 */
function createInputObjectTypeDefinitionMethodDecl(
  msg: ProtoMessage,
  reg: ProtoRegistry
): ts.MethodDeclaration {
  return ts.factory.createMethodDeclaration(
    undefined,
    undefined,
    undefined,
    "definition",
    undefined,
    undefined,
    [
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        "t",
        undefined,
        undefined,
        undefined
      ),
    ],
    undefined,
    ts.factory.createBlock(
      msg.fields.map((f) => createFieldDefinitionStmt(f, reg, { input: true })),
      true
    )
  );
}