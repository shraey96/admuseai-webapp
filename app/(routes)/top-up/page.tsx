"use client";

import { useCredits } from "@/context/CreditContext";
import { purchaseOptions } from "@/constants/purchaseOptions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TopUpPage() {
  const { credits } = useCredits();

  const handlePurchase = async (priceId: string) => {
    // TODO: Implement purchase logic
    console.log("Purchase initiated for:", priceId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Top Up Credits</h1>
        <p className="text-gray-600">Current balance: {credits} credits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchaseOptions.map((option) => (
          <Card key={option.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-2xl font-bold mb-2">${option.price}</div>
              <div className="text-gray-600">{option.credits} credits</div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handlePurchase(option.priceId)}
              >
                Purchase
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
