import { z } from "zod";

/******************************************************************/

export const AddClassSchema = z.object({
  name: z.string().min(1, { message: "Class name is required" }),
  section: z.string().min(1, { message: "Section name is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
});

export type AddClassSchema = z.infer<typeof AddClassSchema>;

/******************************************************************/

export const AddEvaluatorSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  questionPapers: z
    .array(z.string().url())
    .min(1, { message: "Question Papers is required" }),
  answerKeys: z.array(z.string().url()).min(1, {
    message: "Answer Keys is required",
  }),
  classId: z.string().min(1, { message: "Class is required" }),
});

export type AddEvaluatorSchema = z.infer<typeof AddEvaluatorSchema>;

/******************************************************************/
export const AddStudentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rollNo: z.coerce.number().gte(1, { message: "Roll No is Invalid" }).min(1, {
    message: "Roll No is required",
  }),
  classId: z.coerce.string().min(1, { message: "Class is required" }),
});

export type AddStudentSchema = z.infer<typeof AddStudentSchema>;

/******************************************************************/

export const EditStudentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rollNo: z.coerce.number().gte(1, { message: "Roll No is Invalid" }).min(1, {
    message: "Roll No is required",
  }),
});

export type EditStudentSchema = z.infer<typeof EditStudentSchema>;

/******************************************************************/

export const AddShopItem = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  currency: z.string().optional(),
  active: z.boolean().optional().default(true),
  evaluatorLimit: z.number().gte(1, { message: "Evaluator Limit is Invalid" }),
  evaluationLimit: z.number().gte(1, {
    message: "Evaluation Limit is Invalid",
  }),
  price: z.number().gte(1, { message: "Price is Invalid" }),
  features: z.array(z.string()).min(1, { message: "Features is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  popular: z.boolean().optional().default(false),
  exclusive: z.boolean().optional().default(false),
  actionLabel: z.string().min(1, { message: "Action Label is required" }),
});

export type AddShopItem = z.infer<typeof AddShopItem>;

/******************************************************************/

export const CreateOrderRazorpay = z.object({
  itemId: z.string().min(1, { message: "Item is required" }),
});

export type CreateOrderRazorpay = z.infer<typeof CreateOrderRazorpay>;

/******************************************************************/
