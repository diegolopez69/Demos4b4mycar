module.exports = mongoose => {
    const Demo = mongoose.model(
      "demo",
      mongoose.Schema(
        {
          oficialName: String,
          country: String,
          referenceDemo: String,
          urlPage: String,
        },
        { timestamps: true }
      )
    );
  
    return Demo;
  };