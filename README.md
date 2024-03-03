# Slowpoke Todo
## Project setup

### Clone Slowpoke
```bash
git clone https://github.com/sourav-k7/slowbro-frontend.git
```

### Build Slowpoke
```bash
npm install
```

### Run Slowpoke
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Branch naming convention
{taskid}-{small-task-description}

For example: <br>
&nbsp;Let's say we have a task `#2 - implement project sharing feature`<br>
&nbsp; then the Branch name will be `2-project-sharing-feature`

## Feature to implement
[ ] #1 Show unique ids for task <br>
> - Show in active task tile and sidebar as well
> - These ids will be generated once the  task is created

[ ] #2 Show task ids in url
> - TaskIds should be appened as query string in url if opened in sidebar
> - Automatically open sidebar if ids present in a url

[ ] #3 Show new field in tasks
> - Start Date (auto populate and option for custom date selector)
> - End Date (auto populate and option for custom date selector)
> - Tags
> - Show these field in active task and sidebar

[ ] #4 Feature to add blocker task to current task
> - Way to add other task as blocker to some task as task id
> - UI wise it should be show in a shade of red in Todo list

[ ] #5 Feature to mark project as complete

[ ] #6 Implement Forgot password page
> - Implement UI where user can share their email of their account
> - If email exist in DB then send then email with password reset Url or else show account don't exist

[ ] #7 Feature to add subtask directly from active tile
