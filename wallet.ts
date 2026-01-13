


export async function deductBalance(wallet: Wallet, amount: number) {
  
//  Vulnerable: Sensitive data logging
export function logPayment(cardNumber: string, cvv: string) {
  console.log("PAYMENT DEBUG:", { cardNumber, cvv }); // BAD (PCI)
}
  return false;
}
