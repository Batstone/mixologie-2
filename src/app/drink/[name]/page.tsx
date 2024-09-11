'use client'

interface DrinkPageProps {
    params: {
      name: string; 
    };
  }
  

import { useAppSelector } from "../../lib/redux/hooks";

export default function DrinkPage({params}: DrinkPageProps) {
    const { name } = params; 

    const { data, loading, error } = useAppSelector(state => state.drink);

    console.log('name', name)

    return (
        <h1>Drink Page</h1>
    )
}