import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Blog' })
  blog: Types.ObjectId;

  @Prop({ type: String })
  content: string;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.pre('save', function (next) {
  if (this.creator && Types.ObjectId.isValid(this.creator)) {
    this.creator = new Types.ObjectId(this.creator);
  }
  if (this.blog && Types.ObjectId.isValid(this.blog)) {
    this.blog = new Types.ObjectId(this.blog);
  }
  next();
});

export { CommentSchema };
