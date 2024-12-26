const maxFileCount = 10;
const maxFileSize = "8MB"; // 8MB
const currency = "inr";
const currencySymbol = "₹";
const aiModel = "gpt-4o-mini";
const maxTokens = 5000;

const paypalCurrency = "USD"; //Refer: https://developer.paypal.com/api/rest/reference/currency-codes/
const paymentMethods = ["stripe", "razorpay", "paypal"];

const merchantName = "PapercheckAI";
const merchantAddress =
  "PapercheckAI, PapercheckAI Street, 123456, PapercheckAI.";
const razorpayThemeColor = "#528ff0";

const calculateStudentScore = (answers: any) => {
  let scored = 0;
  let totalScore = 0;
  for (const answer of answers) {
    scored += answer.score[0];
    totalScore += answer.score[1];
  }
  return [scored, totalScore];
};
export {
  maxFileCount,
  maxFileSize,
  currency,
  aiModel,
  maxTokens,
  paypalCurrency,
  paymentMethods,
  merchantName,
  merchantAddress,
  razorpayThemeColor,
  currencySymbol,
  calculateStudentScore,
};
