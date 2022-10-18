# movie-night

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




===============
## dev notes


### BUGS - 2022-10-17
- when last voter finishes noms, the votes component displays nothing. need to make sure either the voting screen/component is visible, OR show a msg that says "refresh the page" (refreshing fixed the problem for me, and showed me the voting screen)
- when voting, i was unable to add a third choice. it kept overriding my second choice. i think it had something to do with the "round" var (maybe it didn't switch to 'third')
- i need to re-activate text messaging (at least the first msg at event creation)
- i need to create the admin panel: start/stop noms; start/stop votes; add/update/delete voters/friends; re-send text messages to each voter individually.
- i need to tighten up the voting process. right now it's just a big mess of a spaghetti bowl.
- after submitMyNoms, voter should not be able to "remove" a nom. that button should not even be shown after submission.



### DONE - what is RCV ranked choice voting (https://time.com/5718941/ranked-choice-voting/)
Instead of just choosing who you want to win, you fill out the ballot saying who is your first choice, second choice, or third choice (or more as needed) for each position.

The candidate with the majority (more than 50%) of first-choice votes wins outright. If no candidate gets a majority of first-choice votes, then it triggers a new counting process. The candidate who did the worst is eliminated, and that candidate’s voters’ ballots are redistributed to their second-choice pick. In other words, if you ranked a losing candidate as your first choice, and the candidate is eliminated, then your vote still counts: it just moves to your second-choice candidate. That process continues until there is a candidate who has the majority of votes.


### DONE - to do (v2 - started 2022-10-05)
- need to use the store now, with firebase rtdb
