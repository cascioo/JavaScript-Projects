import random
cont = True
money = int(input("How much money do you have?"))

while(cont):
    game = input("What game do you want to play? Slots or Acey Duecy?")
    bet = int(input("How much do you want to bet?"))

    if (game == "Slots" or game == "slots"):
        type = input("What type of slot? 50%, 25%, 10%?")
        if (type == "50%"):
            if (random.random() < .5):
                money += bet*2
            else:
                money -= bet
            print(money)
        elif (type == "25%"):
            if (random.random() < .25):
                money += bet*(1/.25)
            else:
                money -= bet
            print(money)
        elif (type == "10%"):
            if (random.random() < .1):
                money += bet*(1/.1)
            else:
                money -= bet
            print(money)
    temp = input("Want to play again?")
    if (temp == "yes"):
        cont = True
    elif (temp == "no"):
        cont = False
