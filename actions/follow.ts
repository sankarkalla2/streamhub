"use server";

export const onFollow = (id: string) => {
  try {
    console.log("Iam same as server component", id);
  } catch (err) {
    throw new Error("Internel server error");
  }
};
