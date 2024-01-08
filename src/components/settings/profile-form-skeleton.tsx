import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileFormSkeleton() {
  return (
    <>
      <div className={"flex flex-row w-full gap-4"}>
        <div className={"w-full"}>
          {/* Skeleton for FormLabel */}
          <Skeleton className="h-4 w-32 mb-2" />

          {/* Skeleton for Input Field */}
          <Skeleton className="h-8 w-full mb-3" />
        </div>
        <div className={"w-full"}>
          {/* Skeleton for FormLabel */}
          <Skeleton className="h-4 w-32 mb-2" />

          {/* Skeleton for Input Field */}
          <Skeleton className="h-8 w-full mb-3" />
        </div>
      </div>

      <div className={"w-full"}>
        {/* Skeleton for FormLabel */}
        <Skeleton className="h-4 w-32 mb-2" />

        {/* Skeleton for Input Field */}
        <Skeleton className="h-8 w-full mb-3" />
      </div>

      <div className={"w-full"}>
        {/* Skeleton for FormLabel */}
        <Skeleton className="h-4 w-32 mb-2" />

        {/* Skeleton for Input Field */}
        <Skeleton className="h-8 w-full mb-3" />
      </div>

      <div className={"w-48"}>
        {/* Skeleton for FormLabel */}
        <Skeleton className="h-4 w-32 mb-2" />

        {/* Skeleton for Input Field */}
        <Skeleton className="h-8 w-full mb-3" />
      </div>

      {/*<FormField*/}
      {/*  control={form.control}*/}
      {/*  name="lastName"*/}
      {/*  render={({ field }) => (*/}
      {/*    <FormItem>*/}
      {/*      <FormLabel>Last Name</FormLabel>*/}
      {/*      <FormControl>*/}
      {/*        <Input placeholder="shadcn" {...field} />*/}
      {/*      </FormControl>*/}
      {/*      <FormMessage />*/}
      {/*    </FormItem>*/}
      {/*  )}*/}
      {/*/>*/}

      {/*<FormField*/}
      {/*  control={form.control}*/}
      {/*  name="email"*/}
      {/*  render={({ field }) => (*/}
      {/*    <FormItem>*/}
      {/*      <FormLabel>Email</FormLabel>*/}
      {/*      <FormControl>*/}
      {/*        <Input placeholder="shadcn" {...field} />*/}
      {/*      </FormControl>*/}
      {/*      <FormMessage />*/}
      {/*    </FormItem>*/}
      {/*  )}*/}
      {/*<FormField*/}
      {/*  control={form.control}*/}
      {/*  name="bio"*/}
      {/*  render={({ field }) => (*/}
      {/*    <FormItem>*/}
      {/*      <FormLabel>Bio</FormLabel>*/}
      {/*      <Textarea*/}
      {/*        onChange={field.onChange}*/}
      {/*        defaultValue={props.user.bio ?? ""}*/}
      {/*      />*/}
      {/*      <FormMessage />*/}
      {/*    </FormItem>*/}
      {/*  )}*/}
      {/*/>*/}
      {/*<FormField*/}
      {/*  control={form.control}*/}
      {/*  name="dateOfBirth"*/}
      {/*  render={({ field }) => (*/}
      {/*    <FormItem className="flex flex-col">*/}
      {/*      <FormLabel>Date of birth</FormLabel>*/}
      {/*      <Popover>*/}
      {/*        <PopoverTrigger asChild>*/}
      {/*          <FormControl>*/}
      {/*            <Button*/}
      {/*              variant={"outline"}*/}
      {/*              className={cn(*/}
      {/*                "w-[240px] pl-3 text-left font-normal",*/}
      {/*                !field.value && "text-muted-foreground",*/}
      {/*              )}*/}
      {/*            >*/}
      {/*              {field.value ? (*/}
      {/*                format(field.value, "PPP")*/}
      {/*              ) : (*/}
      {/*                <span>Pick a date</span>*/}
      {/*              )}*/}
      {/*              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />*/}
      {/*            </Button>*/}
      {/*          </FormControl>*/}
      {/*        </PopoverTrigger>*/}
      {/*        <PopoverContent className="w-auto p-0" align="start">*/}
      {/*          <Calendar*/}
      {/*            mode="single"*/}
      {/*            captionLayout="dropdown-buttons"*/}
      {/*            selected={field.value ?? new Date("1900-01-01")}*/}
      {/*            onSelect={field.onChange}*/}
      {/*            disabled={(date) =>*/}
      {/*              date > new Date() || date < new Date("1900-01-01")*/}
      {/*            }*/}
      {/*            fromYear={1900}*/}
      {/*            toYear={new Date().getFullYear()}*/}
      {/*            initialFocus*/}
      {/*          />*/}
      {/*        </PopoverContent>*/}
      {/*      </Popover>*/}
      {/*      <FormMessage />*/}
      {/*    </FormItem>*/}
      {/*  )}*/}
      {/*/>*/}
      {/*<div>*/}
      {/*  {fields.map((field, index) => (*/}
      {/*    <FormField*/}
      {/*      control={form.control}*/}
      {/*      key={field.id}*/}
      {/*      name={`urls.${index}.value`}*/}
      {/*      render={({ field }) => (*/}
      {/*        <FormItem>*/}
      {/*          <FormLabel className={cn(index !== 0 && "sr-only")}>*/}
      {/*            URLs*/}
      {/*          </FormLabel>*/}
      {/*          <FormDescription className={cn(index !== 0 && "sr-only")}>*/}
      {/*            Add links to your website, blog, or social media profiles.*/}
      {/*          </FormDescription>*/}
      {/*          <FormControl>*/}
      {/*            <Input {...field} />*/}
      {/*          </FormControl>*/}
      {/*          <FormMessage />*/}
      {/*        </FormItem>*/}
      {/*      )}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*  <Button*/}
      {/*    type="button"*/}
      {/*    variant="outline"*/}
      {/*    size="sm"*/}
      {/*    className="mt-2"*/}
      {/*    onClick={() => append({ value: "" })}*/}
      {/*  >*/}
      {/*    Add URL*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*<FormField*/}
      {/*  control={form.control}*/}
      {/*  name={"cv"}*/}
      {/*  render={({ field }) => (*/}
      {/*    <FormItem>*/}
      {/*      <FormLabel>CV</FormLabel>*/}
      {/*      <FormControl>*/}
      {/*        <Input type="file" accept={"application/pdf"} {...fileRef} />*/}
      {/*      </FormControl>*/}
      {/*      <FormMessage />*/}
      {/*    </FormItem>*/}
      {/*  )}*/}
      {/*/>*/}

      <Skeleton className="h-8 w-32 mb-3" />

      {/*<Button type="submit" disabled={isSubmitting}>*/}
      {/*  {isSubmitting ? (*/}
      {/*    <>*/}
      {/*      <Loader2 className="mr-2 h-4 w-4 animate-spin" />*/}
      {/*      Please wait*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    <>Update profile</>*/}
      {/*  )}*/}
      {/*</Button>*/}
    </>
  );
}
