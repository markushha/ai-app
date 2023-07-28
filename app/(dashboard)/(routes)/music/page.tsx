"use client";

import * as z from "zod";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";

import Heading from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from 'openai'
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";

export default function MusicPage() {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post('/api/music', values)

      setMusic(response.data.audio)

      form.reset();
    } catch(e: any) {
      console.log(e);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Powered by Replicate AI"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 md:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                          focus-visible:ring-0
                          focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Piano solo in C major"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full col-span-12 mt-2 md:mt-0 md:col-span-2">
                Generate
              </Button>
            </form>
          </Form>
          {/* <div className="mt-2 flex items-center justify-center">
            <Checkbox className="mr-2 w-4 h-4" id="animation" />
            <label className="cursor-pointer text-sm font-medium text-muted-foreground" htmlFor="animation">Turn on writing animation</label>
          </div> */}
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <div className="div">
              <Empty label="No music generated" />
            </div>
          )}
          {music && (
            <audio controls className="w-full my-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
}
