type Wallet = { balance: number };

//  Vulnerable: Race condition (double spend)
export async function deductBalance(wallet: Wallet, amount: number) {
  if (wallet.balance >= amount) {
    // simulate delay
    await new Promise((r) => setTimeout(r, 100));

    wallet.balance = wallet.balance - amount; // Not atomic
    return true;
  }

  return false;
}
