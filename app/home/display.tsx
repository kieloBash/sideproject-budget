"use client";

// UI
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { useState } from "react";
import { addSavingsRecordByEmail } from "@/lib/actions/temp";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

export function DisplayHome() {
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number>();
  const { toast } = useToast();

  async function handleSubmit() {
    if (!amount) return null;
    if (amount <= 0 && amount > 100) return null;

    const res = await addSavingsRecordByEmail({
      email: session?.user?.email || "",
      date: new Date(),
      savedAmount: amount,
      metGoal: amount === 100,
    });

    if (res) {
      toast({ title: "Paid" });
      window.location.reload();
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Haven't paid yet today of balance Php 100`}</CardTitle>
        <CardDescription>{dayjs().format("MMMM DD")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full py-6">Please Pay Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-w-[320px]">
            <DialogHeader>
              <DialogTitle>Budget</DialogTitle>
              <DialogDescription>Adjust the payment here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  id="amount"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Confirm Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
