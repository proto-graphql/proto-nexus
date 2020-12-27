// Code generated by protoc-gen-nexus. DO NOT EDIT.
// source: testapis/deprecation/file_deprecation.proto

import { objectType, inputObjectType, enumType, nullable, nonNull } from "nexus";
import * as $$testapis$node$lib$testapis$deprecation from "@testapis/node/lib/testapis/deprecation";
export type $$testapis$node$lib$testapis$deprecation$testapis$deprecation$DeprecatedFileMessage = $$testapis$node$lib$testapis$deprecation.testapis.deprecation.IDeprecatedFileMessage;
export type $$testapis$node$lib$testapis$deprecation$testapis$deprecation$DeprecatedFileMessageInnerMessage = $$testapis$node$lib$testapis$deprecation.testapis.deprecation.DeprecatedFileMessage.IInnerMessage;
export const DeprecatedFileMessage = objectType({
    name: "DeprecatedFileMessage",
    description: "",
    definition(t) {
        t.field("body", {
            type: nonNull("String"),
            description: "",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated.",
            resolve(root) { return root.body!; }
        });
        t.field("enum", {
            type: nullable("DeprecatedFileEnum"),
            description: "",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated.",
            resolve(root) {
                if (root.enum == null) {
                    return null;
                }
                if (root.enum === $$testapis$node$lib$testapis$deprecation.testapis.deprecation.DeprecatedFileEnum.DEPRECATED_FILE_ENUM_UNSPECIFIED) {
                    return null;
                }
                return root.enum;
            }
        });
    },
    sourceType: { module: __filename, export: "$$testapis$node$lib$testapis$deprecation$testapis$deprecation$DeprecatedFileMessage" }
});
export const DeprecatedFileMessageInnerMessage = objectType({
    name: "DeprecatedFileMessageInnerMessage",
    description: "",
    definition(t) {
        t.field("body", {
            type: nonNull("String"),
            description: "",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated.",
            resolve(root) { return root.body!; }
        });
    },
    sourceType: { module: __filename, export: "$$testapis$node$lib$testapis$deprecation$testapis$deprecation$DeprecatedFileMessageInnerMessage" }
});
export const DeprecatedFileMessageInput = inputObjectType({
    name: "DeprecatedFileMessageInput",
    description: "",
    definition(t) {
        t.field("body", {
            type: nonNull("String"),
            description: "",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated."
        });
        t.field("enum", {
            type: nullable("DeprecatedFileEnum"),
            description: "",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated."
        });
    }
});
export const DeprecatedFileMessageInnerMessageInput = inputObjectType({
    name: "DeprecatedFileMessageInnerMessageInput",
    description: "",
    definition(t) {
        t.field("body", {
            type: nonNull("String"),
            description: "",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated."
        });
    }
});
export const DeprecatedFileEnum = enumType({
    name: "DeprecatedFileEnum",
    description: "",
    members: [
        {
            name: "DEPRECATED_FILE_FOO",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated.",
            value: 1
        },
        {
            name: "DEPRECATED_FILE_BAR",
            deprecation: "testapis/deprecation/file_deprecation.proto is mark as deprecated.",
            value: 2
        }
    ]
});