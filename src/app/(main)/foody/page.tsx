import FoodAnalyzer from "@/src/components/foodAnalyzer/food";
import ProfileLink from "@/src/components/profile/profile-link";
import { auth } from "@/src/lib/auth";

export default async function FoodyPage() {
    const session = await auth();

    return (
        <>
            <div className="flex justify-end p-4">
                <ProfileLink name={session?.user?.name} />
            </div>
            <FoodAnalyzer/>
        </>
    )
}
