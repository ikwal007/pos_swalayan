import { fetchData } from "@/lib/fatchData";

export async function getAllCategorys() {
  const res = await fetchData({
    url: `${process.env.NEXT_PUBLIC_API_URL}/categorys`,
  });
  return res;
}

export async function createCategory(data: { name: string }) {
  const res = await fetchData({
    url: `${process.env.NEXT_PUBLIC_API_URL}/categorys`,
    method: "POST",
    body: data,
  });
  return res;
}

export async function deleteCategory(id: string) {
  const res = await fetchData({
    url: `${process.env.NEXT_PUBLIC_API_URL}/categorys/${id}`,
    method: "DELETE",
  });
  return res;
}
