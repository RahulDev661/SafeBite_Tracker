import { useParams } from "react-router-dom";

function FoodDetail() {
    const { id } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-5xl font-bold">
                Food Detail {id}
            </h1>
        </div>
    );
}

export default FoodDetail;