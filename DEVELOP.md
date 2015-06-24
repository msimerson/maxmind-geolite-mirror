
## Contributions

Contributions are welcome and appreciated. Please keep in mind the following:

* there are no dependencies. That's on purpose.
* test coverage is at 100%, help keep it that way.
* squashed PRs are the best PRs.


### How to squash:

````sh
git remote add msimerson
https://github.com/msimerson/maxmind-geolite-mirror.git
git rebase -i msimerson/master
````

Then change `pick` to `s` for all but the first commit and save changes. Then
force push the squashed branch to your repo:

````sh
git push -f origin
````
