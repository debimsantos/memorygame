# Memory Game Project

## How The Game Works
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

### Functionalities to be implemented / Use Case

#### Memory Game Logic
The player flips one card over to reveal its underlying symbol.
The player then turns over a second card, trying to find the corresponding card with the same symbol.
If the cards match, both cards stay flipped over.
If the cards do not match, both cards are flipped face down.
The game ends once all cards have been correctly matched.

#### Congratulations Popup
When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.

#### Restart Button
A restart button allows the player to reset the game board, the timer, and the star rating.

#### Star Rating
The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).

#### Timer
When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

#### Move Counter
Game displays the current number of moves a user has made.


### Additional functionalties
1. Simulate actual flipping of cards
2. Card color changes and other effects when 2 cards match 
3. Visual effects when cards do not match
4. Indicator when game is finished
5. Star scoring effects

## Development Tools / Language
CSS, HTML and javascript

## Implementation URL: (TBD)
