import React, {useEffect,useState} from "react";
import styles from './MealsList.module.css'
import Card from "../UI/Card";
import Meal from "./MealItem/Meal";
import useApi from "../../hooks/use-api";

const MealsList=()=>{
  const [meals,setMeals]=useState([]);
  const {isLoading , error , sendRequest:getRequest}=useApi();
  useEffect(()=>{
    
    const transformData=(data)=>{
      const loadedmeals=[];
      for(const key in data){
        loadedmeals.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price,
          image:data[key].image
        })
      }
      setMeals(loadedmeals)
    }
    // console.log(meals)
    getRequest({url:"https://react-learn-3f982-default-rtdb.firebaseio.com/meals.json"},transformData)
  },[getRequest])

    const list=meals.map((meal)=>
        <Meal meal={meal} key={meal.id}/>
    )
    return(
        <Card className={styles.meals}>
            <ul>
              {isLoading && !error && <p>is Loading</p>}
              {error && <p>Failed to load meals.</p>}
                {list}
            </ul>
        </Card>
    )
}

export default MealsList;