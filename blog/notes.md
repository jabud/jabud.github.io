# Useful notes: Notes for virtualenv and jupyter notebook users

I found myself quite often going back to the instructions to do some little tasks when using virtualenvs and jupyter notebooks, so instead of learning them for memory I decided to make my own notes to come here every time I need to and find everything in one place.

## VirtualEnv
To know more check: [https://docs.python-guide.org/dev/virtualenvs/](https://docs.python-guide.org/dev/virtualenvs/)

Type the next commands on your terminal.

* Install virtualenv:
	* `pip install virtualenv`

* Create a folder for your environments:
	* `mkdir ~/Envs`
* Go to folder:
	* `cd ~/Envs`
* Create virtualenv:
	* `virtualenv venv`
* Create virtualenv for specific python version:
	* `virtualenv -p /usr/bin/python3.6 venv`
* Activate environment:
	* `source ~/Envs/venv/bin/activate`
* Install dependencies!
* Send dependencies to a txt file:
	* `pip3 freeze >> requirements.txt`
* To deactivate:
	* `deactivate`



## Jupyter notebook

Check the documentation: [https://jupyter.org/](https://jupyter.org/)

* Install:
    * `pip3 install jupyter`

* Install kernel with virtualenv  in jupyter:
    * `ipython kernel install --user --name=venv`

* start notebook:
    * `jupyter notebook`

* Select a new kernel with your environment

![alt-text](https://jfreek.github.io/assets/img/notes/virtualenv_jupyter_example.png)

* Enjoy!


## Add Index with ‘scroll to’ functionality to jupyter notebooks

Let’s say you have at the beginning of your notebook the Index or the summary of your content.
```markdown
# Summary
## Exploring
* Description
* Missing values
* Check distribution
```

What we do is add this a tag with a reference to a tag with an id named exploration:
```html
<a href="#exploration"></a>
```

In the following way:

```markdown
# Summary
## <a href="#exploration">Exploring</a>
* Description
* Missing values
* Check distribution
```

Then, in the respective section of your notebook (In the exploration section), we add a text snippet with the tag using an id named exploration:

```markdown
## Explore data <a id='exploration'></a>
```

And that’s it! Now it’s really easy to walk through large notebooks and go exactly to the section of interest.


## Convert Jupyter Notebooks into HTML
I found this one recently and I just use it every time now.

Library: [https://nbconvert.readthedocs.io/en/latest/](https://nbconvert.readthedocs.io/en/latest/)

First we need to install nbconvert library and one dependency:
* `pip3 install nbconvert`
* `sudo apt-get install pandoc`

Then, convert!

Default way:
* `jupyter nbconvert notebook.ipynb`

If you want to add another format (is supports pdf, markdown, latex, etc):
* `jupyter nbconvert --to FORMAT notebook.ipynb`

If you want to convert full html (`--template full`) or an embedding to add to your blog (`--template basic`):

* `jupyter nbconvert --to html --template basic notebook.ipynb`

And done, add this to your github repo and it will look awesome, including the javascript form your plots. tables, etc.

## Convert Jupyter Notebooks into Slides
In fact the same tool from above can transofrm a notebook into a nice slide-show.

First run the notebook:
`jupyter notebook`

Then, go to the menu bar and click on `view--> Cell Toolbar--> Slideshow`

![alt-text](https://jfreek.github.io/assets/img/notes/slideshow1.png)

After that check the top right side of your cells and select `slide`.

![alt-text](https://jfreek.github.io/assets/img/notes/slideshow2.png)

Finally run on the terminal:
`jupyter nbconvert --to slides notebook.ipynb --post serve`

The notebook will be converted to a slide and run automatically in your browser.

To stop it just hit `ctrl+C` on the terminal.

It can also be ran as:
`jupyter nbconvert --to slides notebook.ipynb`

Just to convert it and look at it later.

## Markdown to html
I use this to create blog posts by writing a markdown file and transform them into html.
There are better ways to do it (like using a jekyll template) but… well, it works for me.

Libraries:
[https://github.com/Python-Markdown/markdown](https://github.com/Python-Markdown/markdown)
[https://pygments.org/](https://pygments.org/)

Install libraries:
* `pip3 install markdown`
* `pip3 install Pygments`

The first one is to convert markdown files and the second to create a CSS in case we need it.

Example of a markdown file:
This same text: [notes.md](https://github.com/jfreek/jfreek.github.io/blob/master/blog/notes.md)

Convert:
```python
python -m markdown notes.md > notes.html
```

Convert with CSS:
```python
python -m markdown -x codehilite notes.md > notes.html
```

```bash
pygmentize -S default -f html > codehilite.css
```

Add html with CSS and other useful links:
```html
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<link rel="stylesheet" type="text/css" href="./codehilite.css">
</head>

<body>
===================================================

            Markdown transformed content

===================================================
</body>
</html>
```

In my case I already have a template with the html structure and css, so that is the one I am using.
The result is… this article.
