import {
  FieldDescriptorProto,
  DescriptorProto,
  SourceCodeInfo,
  FileDescriptorProto,
} from "google-protobuf/google/protobuf/descriptor_pb";

export class ProtoFile {
  constructor(private readonly descriptor: FileDescriptorProto) {}

  get importPath(): string {
    return `${this.descriptor.getName()!.split(".").slice(0, -1).join(".")}_pb`;
  }

  get messages(): ProtoMessage[] {
    return this.descriptor
      .getMessageTypeList()
      .map((d, i) => new ProtoMessage(d, this, i));
  }

  public findComments(d: ProtoMessage | ProtoField): Comments {
    const l = this.findSourceLocation(d);
    if (l === null) return {};
    return {
      leadingComments: l.getLeadingComments()!.trim(),
      trailingComments: l.getTrailingComments()!.trim(),
      leadingDetachedCommentsList: l
        .getLeadingDetachedCommentsList()!
        .map((s) => s.trim()),
    };
  }

  private findSourceLocation(
    d: ProtoMessage | ProtoField
  ): SourceCodeInfo.Location | null {
    let paths: number[] = [];
    let desc: ProtoFile | ProtoMessage | ProtoField = d;

    for (;;) {
      if (desc instanceof ProtoFile) {
        paths = paths.reverse();
        return (
          this.descriptor
            .getSourceCodeInfo()
            ?.getLocationList()
            .find(
              (l) =>
                l.getPathList().length === paths.length &&
                l.getPathList().every((v, i) => v === paths[i])
            ) || null
        );
      } else if (desc instanceof ProtoMessage) {
        paths.push(desc.index);
        desc = desc.parent;
        if (desc instanceof ProtoFile) {
          paths.push(4);
        } else if (desc instanceof ProtoMessage) {
          paths.push(3);
        }
      } else if (desc instanceof ProtoField) {
        paths.push(desc.index);
        desc = desc.parent;
        paths.push(2);
      } else {
        const _exhaustiveCheck: never = desc;
      }
    }
  }
}

export class ProtoMessage {
  constructor(
    readonly descriptor: DescriptorProto,
    readonly parent: ProtoFile | ProtoMessage,
    readonly index: number
  ) {}

  get name(): string {
    return this.descriptor.getName()!;
  }

  get description(): string {
    return this.comments?.leadingComments || "";
  }

  get importPath(): string {
    return this.file.importPath;
  }

  get comments(): Comments {
    return this.file.findComments(this);
  }

  get file(): ProtoFile {
    let parent = this.parent;
    for (;;) {
      if (parent instanceof ProtoFile) return parent;
      parent = parent.parent;
    }
  }

  get messages(): ProtoMessage[] {
    return this.descriptor
      .getNestedTypeList()
      .map((d, i) => new ProtoMessage(d, this, i));
  }

  get fields(): ProtoField[] {
    return this.descriptor
      .getFieldList()
      .map((d, i) => new ProtoField(d, this, i));
  }
}

export class ProtoField {
  constructor(
    readonly descriptor: FieldDescriptorProto,
    readonly parent: ProtoMessage,
    readonly index: number
  ) {}

  get name(): string {
    return this.descriptor.getJsonName()!;
  }

  get getterName(): string {
    const name = this.name;
    let suffix = "";
    if (this.isList()) {
      suffix += "List";
    }
    return `get${name.charAt(0).toUpperCase()}${name.slice(1)}${suffix}`;
  }

  get protoTypeName(): string {
    return this.descriptor.getTypeName()!;
  }

  get description(): string {
    return this.comments?.leadingComments || "";
  }

  public isList(): boolean {
    return (
      this.descriptor.getLabel() === FieldDescriptorProto.Label.LABEL_REPEATED
    );
  }

  public isNullable(): boolean {
    return !(
      this.descriptor.getLabel() ===
        FieldDescriptorProto.Label.LABEL_REQUIRED ||
      this.comments?.leadingComments?.startsWith("Required. ")
    );
  }

  get comments(): Comments {
    return this.parent.file.findComments(this);
  }
}

interface Comments {
  leadingComments?: string;
  trailingComments?: string;
  leadingDetachedCommentsList?: string[];
}
