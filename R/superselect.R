#' <Add Title>
#'
#' <Add Description>
#'
#' @importFrom reactR createReactShinyInput
#' @importFrom htmltools htmlDependency tags
#'
#' @export
superselectInput <- function(inputId, default = "") {
  reactR::createReactShinyInput(
    inputId,
    "superselect",
    htmltools::htmlDependency(
      name = "superselect-input",
      version = "1.0.0",
      src = "www/jsdemo/superselect",
      package = "jsdemo",
      script = "superselect.js"
    ),
    default,
    list(),
    htmltools::tags$span
  )
}

#' <Add Title>
#'
#' <Add Description>
#'
#' @export
updateSuperselectInput <- function(session, inputId, value, configuration = NULL) {
  message <- list(value = value)
  if (!is.null(configuration)) message$configuration <- configuration
  session$sendInputMessage(inputId, message);
}