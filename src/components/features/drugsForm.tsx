"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "@/components/password-input";
import {
  deleteDrugsId,
  getDrugs,
  insertDrugs,
  updateDrugs,
} from "./drugsActions";
import { useRouter } from "next/navigation";

const clientFormSchema = z.object({
  id: z.coerce.number().optional(),
  drugName: z.string(),
  drugDescription: z.string(),
  drugUsedFor: z.string(),
  brand: z.string(),
  drugType: z.string(),
  quantity: z.string(),
  pricePerUnit: z.string(),
  // expDate: z.coerce.date().optional(),
  // manDate: z.coerce.date().optional(),
  // expDate: z.preprocess(
  //   (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
  //   z.date()
  // ),
  // manDate: z.preprocess(
  //   (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
  //   z.date()
  // ),
  expDate: z.date().pipe(z.coerce.string()),
  manDate: z.date().pipe(z.coerce.string()),
  sideEffects: z.string(),
  suggestedAges: z.string(),
  warnings: z.string(),
  supplierName: z.string(),
  supplierNumber: z.string().optional().array(),
});

type Clientprops = {
  clientid?: number;
};

export function ProfileForm({ clientid = 0 }: Clientprops) {
  const [id, setid] = useState<number>(0);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    setid(clientid);
    if (clientid != 0) {
      const fetchSt = async () => {
        const res = await getDrugs(clientid);
        console.log(res);
        if (res.data) {
          form.reset(res.data);
        }
      };

      fetchSt();
    }
  }, []);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof clientFormSchema>) {
    if (id == 0) {
      insertDrugs(values)
        .then((res) => {
          console.log(res);
          setid(res.lastInsertRowid);
          setValue("id", res.lastInsertRowid);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDrugs(values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function handleDelete() {
    deleteDrugsId(id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function handlePortfolioId() {
    console.log("id is", id);

    router.push("/portfolio/" + id);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:ml-[50px] ml-[30px] md:mr-[50px] mr-[30px] mt-6 mb-6"
      >
        <div className="space-y-8">
          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Id"
                      type="number"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drugName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drug Name</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Drug Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="drugDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drugUsedFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Used For</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Used For"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Brand"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="drugType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drug Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="md:w-[300px] w-[200px]">
                        <SelectValue placeholder="Select Drug Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Drug Type</SelectLabel>
                          <SelectItem value="Tablet">Tablet</SelectItem>
                          <SelectItem value="Liquid">Liquid</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Per Unit</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Price Per Unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="expDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[300px] w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Manufacture Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[300px] w-[200px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="sideEffects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Side Effects</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Side Effects"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suggestedAges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Limit</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} {...field}>
                      <SelectTrigger className="md:w-[300px] w-[200px]">
                        <SelectValue placeholder="Select Age Limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Age Limit</SelectLabel>
                          <SelectItem value="0 - 10">0 - 10</SelectItem>
                          <SelectItem value="10 - 16">10 - 16</SelectItem>
                          <SelectItem value="16 - 30">16 - 30</SelectItem>
                          <SelectItem value="30 - Any Limit">
                            30 - Any Limit
                          </SelectItem>
                          <SelectItem value="Any Age">Any Age</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="warnings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warnings</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Warnings"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplierName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Name</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Supplier Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:flex flex-row gap-20 md:space-y-0 space-y-8">
            <FormField
              control={form.control}
              name="supplierNumber.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Number 01</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Supplier Number 01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplierNumber.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Number 02</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-[300px] w-[200px]"
                      placeholder="Supplier Number 02"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <Button type="submit">{id == 0 ? "Add" : "Update"}</Button>

          {id == 0 ? null : (
            <Button type="button" className="bg-red-700" onClick={handleDelete}>
              Delete
            </Button>
          )}

          {id == 0 ? null : (
            <Button
              type="button"
              className="bg-green-700"
              onClick={handlePortfolioId}
            >
              View Portfolio
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
