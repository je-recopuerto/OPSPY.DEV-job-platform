export type FormSplitterProps = {
  text: string,
  className?: any
}

export default function FormSplitter(props: FormSplitterProps) {
  return (
    <div className={`flex items-center gap-4 ${props.className ? props.className : ''}`}>
      <div className={"flex-1 border-t-2 border-gray-200 dark:border-gray-700"} />
      <p className={"text-gray-500 dark:text-gray-400 font-semibold text-sm"}>{props.text}</p>
      <div className={"flex-1 border-t-2 border-gray-200 dark:border-gray-700"} />
    </div>
  )
}