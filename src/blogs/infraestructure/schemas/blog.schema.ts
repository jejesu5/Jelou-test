import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: Types.ObjectId;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: [String] })
  tags: string[];
}

const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.pre('save', function (next) {
  if (this.creator && Types.ObjectId.isValid(this.creator)) {
    this.creator = new Types.ObjectId(this.creator);
  }
  next();
});

export { BlogSchema };
