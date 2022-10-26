#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'     DO NOT REMOVE.
#' @import shiny
#' @importFrom dplyr filter arrange rename
#' @noRd
app_server <- function(input, output, session) {

  
  dat <- shiny::reactive({
    adlb |>
      filter(PARAMCD %in% input$superselect) |>
      arrange(PARAMCD, ADY) |>
      rename(
        ANRLO = A1LO,
        ANRHI = A1HI
      )
  })

  output$chart <- renderMlchart({
    req(dat())
    mlchart(dat())
  })
}
