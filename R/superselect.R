#' Generate a SuperSelect input.
#'
#' @param inputId ID of the input.
#' @param lab_param_tree A named list representing a 2-level tree of lab
#' params.  The first level represents the lab category and maps to the
#' SupserSelect group name.  The list values include properties required
#' by the SuperSelect.
#'
#' @importFrom reactR createReactShinyInput
#' @importFrom htmltools htmlDependency tags
#'
#' @export
superselectInput <- function(inputId, lab_param_tree = list()) {
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
    list(),
    list(
      elements = lab_param_tree
    ),
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