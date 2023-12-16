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
import { useState } from "react";
import { addSavingsRecordByEmail } from "@/lib/actions/temp";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export function DisplayHome({
  goal,
  savedAmount,
}: {
  goal: number;
  savedAmount: number;
}) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number>();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!amount) return null;
    if (amount <= 0 && amount > 100) return null;
    setIsLoading(true);

    const res = await addSavingsRecordByEmail({
      email: session?.user?.email || "",
      date: new Date(),
      savedAmount: savedAmount + amount,
      metGoal: amount >= goal ? true : false,
    });

    if (res) {
      toast({ title: "Paid" });
      queryClient.invalidateQueries({
        queryKey: [`savings:today`],
      });
      setOpen(false);
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center -space-y-2">
        <p className="text-lg">Balance Left Today</p>
        <Label className="text-9xl font-black">{goal}</Label>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="px-10 text-xl font-bold py-8 rounded-xl shadow">
            Please Pay Now
          </Button>
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
            <Button type="button" disabled={isLoading} onClick={handleSubmit}>
              Confirm Payment{" "}
              {isLoading && <Loader2 className="w-5 h-5 animate-spin ml-2" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
