"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useForm } from "@tanstack/react-form-nextjs";
import { z } from "zod";

export default function page() {
  const createdForm = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1, "Nama kategori harus diisi"),
      }),
    },
    onSubmit: async (values) => {
      console.log(values);
      createdForm.reset();
    },
  });

  return (
    <div>
      <div className="flex px-4 py-2 items-center gap-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Membuat Kategori Baru
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Membuat Kategori Baru, untuk menambahkan kategori produk baru
              </p>
            </TooltipContent>
          </Tooltip>
        </h4>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createdForm.handleSubmit();
        }}
        className="flex flex-col items-center justify-center min-h-100 gap-4"
      >
        <div className="px-4 py-2 flex gap-4 justify-center items-center ">
          <createdForm.Field
            name="name"
            children={(field) => (
              <Field data-invalid={field.state.meta.errors.length > 0}>
                <FieldLabel htmlFor="NameCategory">Nama Kategory</FieldLabel>
                <Input
                  className="min-w-xl"
                  id="NameCategory"
                  placeholder="Masukan Nama Kategori"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldDescription
                  data-invalid={field.state.meta.errors.length > 0}
                >
                  {field.state.meta.errors[0]?.message}
                </FieldDescription>
              </Field>
            )}
          />
        </div>
        <div className="px-4 py-2 flex min-w-xl justify-end items-center w-2/4">
          <createdForm.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit || isSubmitting} type="submit">
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
