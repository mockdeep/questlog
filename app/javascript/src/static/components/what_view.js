import React from 'react';

import Link from 'src/route/containers/link';

function WhatPage() {
  return (
    <div>
      <h2>{"What's a Questlog?"}</h2>
      <p>
        {
          `Questlog is a toolkit for managing your todo lists. More than simply
            a place to put your tasks or yet another way to organize them,
            Questlog aims to help you make better decisions about how you spend
            your time by taking an active part in the process of managing your
            tasks and your time. It can help you not only to organize your
            lists, but tell you exactly what you ought to work on next. It can
            also help you by identifying tasks that maybe need a little more
            information to be actionable. Here are some of the tools you can
            use`
        }
      </p>
      <h2>{'Focus Page'}</h2>
      <p>
        {'The '}<Link to='root'>{'Focus Page'}</Link>
        {
          ` shows you one task at a time. Which task is displayed depends on
            your prioritization from other pages, such as which timeframe it
            has been added to, as well as priority. If you've given your tasks
            tags, then you can choose a tag at the top to filter to specific
            groupings, such as "at-home" or "at-work". You'll also find an
            option to "Nag me about next task". This will pop up a browser
            notification every so often to remind you of your next task. With
            so many other notifications trying to pull you away from what
            you're supposed to be doing, why not have one trying to pull you
            back?`
        }
      </p>
      <h2>{'Task List Page'}</h2>
      <p>
        {'Your '}<Link to='tasks'>{'Task List'}</Link>
        {
          ` is where you can organize your tasks. You can assign priorities,
            delete, mark tasks completed, and drag and drop to re-order them.
            You can also click on a tasks's title in order to edit it. If
            you've broken a task down into sub-tasks you can use the filters at
            the top to see only "ROOT" or "LEAF" tasks. At the bottom you'll
            also see a "Pending tasks" section if you've postponed any tasks or
            have repeating tasks waiting to be released.`
        }
      </p>
      <h2>{'Timeframes Page'}</h2>
      <p>
        {'The '}<Link to='timeframes'>{'Timeframes Page'}</Link>
        {
          ` is where you can get more specific about when you expect to work on
            something. You can plan tasks that you will get done today, this
            week, this month or on into the future. Tasks that have been given
            a timeframe of "today" will show up first on the Focus Page, then
            "this week" and so forth. The Timeframes Page limits how much
            you're allowed to add to each timeframe based on your historical
            productivity and how many days are left in that timeframe, so if
            you've typically finished about 2 hours of tasks each day, it'll
            allow you 2 hours for today, and it cuts that in half for future
            timeframes to allow for things that just pop up, so if there are 4
            days left in the week not including today, it would allow you to
            have 4 hours worth of tasks in "this week".`
        }
      </p>
      <h2>{'Sub Tasks'}</h2>
      <p>
        {"Next to the task title on each page you'll find an edit icon: "}
        <i className='fa fa-edit' />{'.'}
        {
          ` This will take you to a page where you can view the task and also
            add sub-tasks to it. Sub-tasks will show up on the Focus Page until
            they are postponed or marked complete, at which point the parent
            task will show up again. These can also be filtered via the "ROOT"
            and "LEAF" links on the Task List Page.`
        }
      </p>
      <Link to='privacy'>{'Privacy'}</Link>
    </div>
  );
}

export default WhatPage;
