
import MultimediaForm from "../../component/MultimediaForm"


export default async function page({
  params,
}: {
  params: Promise<{ draft: string }>
}){
  const { draft } = await params
  return (
    <div>
        <MultimediaForm draft={draft} />   
    </div>
  )
}
