import React ,{Fragment} from "react";
import MealsList from "./MealsList";
import MealsSummary from "./Summary";

const MealSection=()=>{
    return(
        <Fragment>
            <MealsSummary/>
            <MealsList/>
        </Fragment>
    )
}

export default MealSection;