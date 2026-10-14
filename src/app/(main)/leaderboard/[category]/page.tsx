import { Leaderboard } from "@/src/components/leaderboard/leaderboard-template"
import { getLeaderboard } from "@/src/lib/getleaderboard"

export default async function Page({ params }: { params: { category: string } }) {
  const { category } = await params
  const fetchedData = await getLeaderboard()

  let data = fetchedData.byTotal

  if (category === "easy") data = fetchedData.byEasy
  else if (category === "medium") data = fetchedData.byMedium
  else if (category === "hard") data = fetchedData.byHard
  else if (category === "daily") data = fetchedData.byDaily
  else if (category === "contest" || category === "rating") data = fetchedData.byRating

  return <Leaderboard category={category} data = {data}/>
}