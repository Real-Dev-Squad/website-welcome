# How can I contribute?

You can add questions and answers in FAQ.
You can style the pages using CSS.
If you find a bug anywhere, you can fix it.

# File Structure

```
├── index.html                         For homepage HTML page 
├── css                                All the styling goes here
│   ├── common
│   ├── pages
├── img                                All the images go here
│   ├── logos
│   ├── pages
├── code-of-conduct.html               For code of conduct HTML page
├── faq.html                           For FAQs HTML page
├── discord.html                       For discord help HTML page
├── readme.md                          README file for the repository
├── contribution.md                    Contribution file
```

# Setup

1. Fork this repository using the Fork option at the top-right corner of this page. This will create your own copy of this repository.

2. Clone your forked repository, this will download your copy of repository in your computer. To do this, open your terminal (command prompt/bash/git bash) and enter the following command:
``` 
git clone https://github.com/<your-username>/website-welcome/ 
```

3. Add the original repository as a remote repository, so that you can anytime pull the latest changes from the main repository which is being deployed, this needs to be done only for the first time.
``` 
git remote add upstream https://github.com/Real-Dev-Squad/website-welcome/ 
```
To make sure you always have the latest copy of the main repository before starting with your changes, execute the following command:
```
git pull upstream main
```

4. Create a new branch to work on. We require a different branch so that we always have a stable, working version in the default (main) branch.
``` 
git checkout -b <branch-name> 
```

For example, if I want to name my branch as "develop", I'll enter the following command:
``` 
git checkout -b develop
```

5. Perform the tasks you wanted to, can be anything, ranging from fixing simple typo to re-designing the whole page!

6. Now you have made changes, though they are saved in your system, Git doesn't know what changes you've done. So you have "commit" your changes. First step is to add the files which you want to add to the staging area, the dot after add in the firt command tells Git to check for changes in all the files. The second step is about committing your changes. The message part is short description of your commit, like "fixed the css for homepage".
``` 
git add .
git commit -m "Write message about your commit" 
```

7. Now your branch (develop, in my case) has the changes you made, once you're sure that your code is stable, it's time to merge the changes into the main branch of your local machine. The first command takes you to the main branch and the second command helps merge the other branch with the main branch.
``` 
git checkout main
git merge <branch-name>
```

For example, if the branch name is develop:
```
git merge develop
```

8. Now it is the time to push the changes of your local main branch to your copy of the repository (aka forked repository) which is on Github (which we cloned in step 2).
```
git push origin
```

8. Now go to your forked repository and you'll see that your branch is ahead of the main branch by some number of commits, right next to it will be an option to Pull Request. Click on it, submit your pull request explaining what you've done.

9. Wait for it to get reviewed, make the changes required (if any) , commit your changes and hit pull request again, your commits will be added to the pull request you had opened earlier (if it is NOT closed).

10. Congratulations on making your first Pull Request!