import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function page() {
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
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <div className="px-4 py-2 flex gap-4 justify-center items-center">
          <Field>
            <FieldLabel htmlFor="NameCategory">Nama Kategory</FieldLabel>
            <Input
              className="min-w-xl"
              id="NameCategory"
              placeholder="Masukan Nama Kategori"
            />
          </Field>
        </div>
        <div className="px-4 py-2 flex min-w-xl justify-end items-center w-full">
          <Button>Simpan</Button>
        </div>
      </div>
    </div>
  );
}
