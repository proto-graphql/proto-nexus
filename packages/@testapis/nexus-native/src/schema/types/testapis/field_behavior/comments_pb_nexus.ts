// Code generated by protoc-gen-nexus. DO NOT EDIT.
// source: testapis/field_behavior/comments.proto

import { objectType, inputObjectType, nullable, nonNull } from "nexus";
import * as $$testapis$node_native$lib$testapis$field_behavior$comments_pb from "@testapis/node-native/lib/testapis/field_behavior/comments_pb";
export type $$testapis$node_native$lib$testapis$field_behavior$comments_pb$FieldBehaviorComentsMessage = $$testapis$node_native$lib$testapis$field_behavior$comments_pb.FieldBehaviorComentsMessage;
export type $$testapis$node_native$lib$testapis$field_behavior$comments_pb$FieldBehaviorComentsMessagePost = $$testapis$node_native$lib$testapis$field_behavior$comments_pb.FieldBehaviorComentsMessage.Post;
export const FieldBehaviorComentsMessage = objectType({
    name: "FieldBehaviorComentsMessage",
    description: "",
    definition(t) {
        t.field("requiredField", {
            type: nonNull("FieldBehaviorComentsMessagePost"),
            description: "Required.",
            resolve(root) { return root.getRequiredField()!; }
        });
        t.field("requiredOutputOnlyField", {
            type: nonNull("FieldBehaviorComentsMessagePost"),
            description: "Required. Output only.",
            resolve(root) { return root.getRequiredOutputOnlyField()!; }
        });
        t.field("outputOnlyRequiredField", {
            type: nonNull("FieldBehaviorComentsMessagePost"),
            description: "Output only. Required.",
            resolve(root) { return root.getOutputOnlyRequiredField()!; }
        });
        t.field("outputOnlyField", {
            type: nullable("FieldBehaviorComentsMessagePost"),
            description: "Output only.",
            resolve(root) { return root.getOutputOnlyField() ?? null; }
        });
    },
    sourceType: { module: __filename, export: "$$testapis$node_native$lib$testapis$field_behavior$comments_pb$FieldBehaviorComentsMessage" }
});
export const FieldBehaviorComentsMessagePost = objectType({
    name: "FieldBehaviorComentsMessagePost",
    description: "",
    definition(t) {
        t.field("body", {
            type: nonNull("String"),
            description: "",
            resolve(root) { return root.getBody(); }
        });
    },
    sourceType: { module: __filename, export: "$$testapis$node_native$lib$testapis$field_behavior$comments_pb$FieldBehaviorComentsMessagePost" }
});
export const FieldBehaviorComentsMessageInput = inputObjectType({
    name: "FieldBehaviorComentsMessageInput",
    description: "",
    definition(t) {
        t.field("requiredField", {
            type: nonNull("FieldBehaviorComentsMessagePostInput"),
            description: "Required."
        });
        t.field("requiredInputOnlyField", {
            type: nonNull("FieldBehaviorComentsMessagePostInput"),
            description: "Required. Input only."
        });
        t.field("inputOnlyRequiredField", {
            type: nonNull("FieldBehaviorComentsMessagePostInput"),
            description: "Input only. Required."
        });
        t.field("inputOnlyField", {
            type: nullable("FieldBehaviorComentsMessagePostInput"),
            description: "Input only."
        });
    }
});
export const FieldBehaviorComentsMessagePostInput = inputObjectType({
    name: "FieldBehaviorComentsMessagePostInput",
    description: "",
    definition(t) {
        t.field("body", {
            type: nonNull("String"),
            description: ""
        });
    }
});