const ContentBlock = require("../models/ContentBlock");

module.exports = {
  Query: {
    async getContentBlockById(_, { contentBlockID }) {
      try {
        const contentBlock = await ContentBlock.findById(contentBlockID);
        return contentBlock;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getContentBlocks() {
      try {
        const contentBlocks = await ContentBlock.find();
        return contentBlocks;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getContentBlocksByType(_, { contentBlockType }) {
      try {
        const contentBlocks = await ContentBlock.find({
          type: contentBlockType,
        });
        return contentBlocks;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createContentBlock(
      _: any,
      {
        contentBlockInput: { name, type, content, orderNumber },
      }: {
        contentBlockInput: {
          name: String;
          type: String;
          content: String;
          orderNumber: BigInt;
        };
      }
    ) {
      const newContentBlock = new ContentBlock({
        name: name,
        type: type,
        content: content,
        orderNumber: orderNumber,
        createdAt: new Date().toISOString(),
      });

      console.log(newContentBlock);

      const contentBlock = await newContentBlock.save();
      return contentBlock;
    },
    async deleteContentBlock(_: any, { contentBlockID }: any) {
      const wasDeleted = (await ContentBlock.deleteOne({ _id: contentBlockID }))
        .deletedCount;

      const wasNotFound = (
        await ContentBlock.deleteOne({ _id: contentBlockID })
      ).n;

      if (wasNotFound) {
        return "ContentBlock was not found";
      } else if (wasDeleted) {
        return "ContentBlock was deleted";
      } else {
        return "ContentBlock was not deleted";
      }
    },
    async updateContentBlock(
      _: any,
      {
        contentBlockID,
        contentBlockInput: { name, type, content, orderNumber },
      }: any
    ) {
      const wasEdited = (
        await ContentBlock.updateOne(
          { _id: contentBlockID },
          {
            name: name,
            type: type,
            content: content,
            orderNumber: orderNumber,
            updatedAt: new Date().toISOString(),
          }
        )
      ).modifiedCount;

      const wasNotFound = (
        await ContentBlock.updateOne(
          { _id: contentBlockID },
          {
            name: name,
            type: type,
            content: content,
            orderNumber: orderNumber,
            updatedAt: new Date().toISOString(),
          }
        )
      ).n;

      if (wasNotFound) {
        return "ContentBlock was not found";
      } else if (wasEdited) {
        return "ContentBlock was edited";
      } else {
        return "ContentBlock was not edited";
      }
    },
  },
};
