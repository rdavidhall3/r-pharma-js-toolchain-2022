#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#' @importFrom dplyr distinct pull filter arrange
#'
#' @export
mlchart <- function(dat, width = NULL, height = NULL, elementId = NULL) {

  # describe a React component to send to the browser for rendering.
  component <- reactR::reactMarkup(
    reactR::component("MultiLabChart", list(
      data = dat
    ))
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'mlchart',
    component,
    width = width,
    height = height,
    package = 'jsdemo',
    elementId = elementId
  )
}

#' Called by HTMLWidgets to produce the widget's root element.
#' @noRd
widget_html.mlchart <- function(id, style, class, ...) {
  htmltools::tagList(
    # Necessary for RStudio viewer version < 1.2
    reactR::html_dependency_corejs(),
    reactR::html_dependency_react(),
    reactR::html_dependency_reacttools(),
    htmltools::tags$div(id = id, class = class, style = style)
  )
}

#' Shiny bindings for mlchart
#'
#' Output and render functions for using mlchart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a mlchart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name mlchart-shiny
#'
#' @export
mlchartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'mlchart', width, height, package = 'jsdemo')
}

#' @rdname mlchart-shiny
#' @export
renderMlchart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, mlchartOutput, env, quoted = TRUE)
}