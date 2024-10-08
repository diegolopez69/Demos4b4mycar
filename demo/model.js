import {model, Schema} from "mongoose"

const DemoSchema = new Schema(
  {
    oficialName: String,
    country: String,
    referenceDemo: String,
    urlPage: String,
    question: Object
  },
  { timestamps: true }
)

const Demo = model("Demo", DemoSchema)

export default Demo