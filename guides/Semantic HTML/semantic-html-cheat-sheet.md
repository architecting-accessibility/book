# Semantic HTML Cheat Sheet

When you're rushing to meet a deadline, use this quick reference to choose HTML elements that communicate **meaning and purpose**, not just appearance. Native HTML provides much of the accessibility behaviour you need without extra ARIA or JavaScript.

> **Rule of thumb:** Use the most appropriate native HTML element first. Add ARIA only when it is needed and supported; ARIA does not automatically provide keyboard interaction or other native behaviour.

## Page structure and landmarks

- Use `<header>`, `<main>`, and `<footer>` to organise page content. Aim for **one visible `<main>` per page**. A page-level `<header>` typically exposes a *banner* landmark and a page-level `<footer>` a *content information* landmark; nested headers and footers (for example, within an article) do not have those landmark roles.
- Wrap major groups of navigation links in `<nav>`, not every group of inline links in prose. If a page has multiple navigation landmarks, give them distinguishing accessible names when they serve different purposes.
- Use `<section>` to group thematically related content, generally with a heading. A heading alone **does not** make it a named *region* landmark. If a section should be navigable as a landmark, give it an accessible name, often with `aria-labelledby` pointing to its heading. Avoid creating excessive landmarks.

```html
<main>
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Services</h2>
    <p>Explore the services available to you.</p>
  </section>
</main>
```

- Use `<article>` for self-contained content that could reasonably stand on its own, such as a blog post, news article, or forum post.
- Use `<aside>` for complementary content, such as related resources or a contextual sidebar, rather than content central to the page's main purpose.
- Give each page a descriptive `<title>` and set the primary document language using `<html lang="en">` (with the appropriate language code). Mark up passages in another language with `lang` when necessary.

## Text and content

- Use `<h1>` through `<h6>` for a logical heading hierarchy. Keep headings meaningful and avoid skipping levels where possible; do not choose a heading level simply for its visual styling.
- Use `<p>` for paragraphs, not repeated `<br>` elements to create spacing.
- Use `<ul>` for unordered lists, `<ol>` for sequences where order matters, and `<li>` for each item.
- Use `<dl>`, `<dt>`, and `<dd>` for name–description groups, such as a glossary or metadata labels and values.
- Use `<strong>` for strong importance and `<em>` for stress emphasis, not merely to make text bold or italic. Use CSS for visual styling.
- Use `<blockquote>` for extended quotations and `<cite>` when identifying the title of a cited work.
- Use `<time datetime="2026-10-24">24 October 2026</time>` when a machine-readable date or time would be useful.

## Links and controls

- Use `<a href="...">` to navigate to a resource or location. Write meaningful link text that makes sense in context; avoid generic text such as “click here”.
- Use `<button>` for actions, such as submitting, opening a menu, or dismissing a dialog. Prefer its native keyboard and focus behaviour over clickable `<div>` or `<span>` elements.
- Use `<details>` with a `<summary>` for simple expandable disclosures where its native behaviour fits the interaction.
- Avoid adding `role="button"`, `tabindex`, or custom keyboard handlers to generic elements when a native `<button>` would do the job.

## Forms

- Use `<form>` for controls that submit a collection of data. A form is exposed as a landmark when it has an accessible name; not every form needs to be a landmark.
- Associate inputs with visible `<label>` elements. Prefer matching `for` and `id` values; nesting a control inside its label also creates an implicit association.
- Choose appropriate native `<input>` types (`email`, `tel`, `number`, `date`, `checkbox`, `radio`, and so on). Choose types by the meaning of the data, not just the desired keyboard; consider `inputmode` where appropriate.
- Use `<select>` and `<option>` for native selection controls and `<textarea>` for longer, multi-line responses.
- Use `<fieldset>` and `<legend>` to group related controls, especially radio buttons and checkboxes sharing a question.

```html
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>
```

- Use `<output>` when displaying a calculated result, where appropriate. Provide clear instructions and error messages; semantics alone are not enough.

## Images and media

- Use `<img>` with an appropriate `alt` attribute. Describe the **purpose** of informative images; use `alt=""` for images that are purely decorative. Functional images need text that conveys the action or destination.
- Use `<figure>` and `<figcaption>` for self-contained illustrations, diagrams, or other content that benefits from a caption. A caption does not automatically replace an image's required text alternative.
- Use native `<audio>` and `<video>` elements where appropriate, and provide suitable alternatives such as captions and transcripts as required by the content.

## Tables

- Use `<table>` for tabular data, **never merely for page layout**. Use `<caption>` when a table needs a title or explanation.
- Use `<th>` for headers, `<td>` for data, and `scope="col"` or `scope="row"` for straightforward header associations. Complex tables may require additional associations.
- Use `<thead>`, `<tbody>`, and `<tfoot>` where they clarify table structure.

```html
<table>
  <caption>Service availability</caption>
  <thead>
    <tr><th scope="col">Service</th><th scope="col">Status</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Applications</th><td>Available</td></tr>
  </tbody>
</table>
```

## Layout and final checks

- Use `<div>` and `<span>` when **no more meaningful element fits**, together with CSS Grid or Flexbox for visual layout. These generic elements do not add semantics by themselves.
- Keep the DOM and reading order logical. CSS can reposition elements visually, but that does not necessarily change the order experienced by keyboard and assistive technology users.
- Preserve visible focus indicators and test navigation using only a keyboard.
- Validate the resulting markup and check its behaviour with assistive technologies. **Semantic HTML is a foundation for accessibility, not a guarantee of conformance.**

## Further reading

- [W3C WAI: Page regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)
- [W3C WAI: Landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)
- [W3C WAI: Forms tutorial](https://www.w3.org/WAI/tutorials/forms/)
- [W3C WAI: Images tutorial](https://www.w3.org/WAI/tutorials/images/)
- [MDN: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
