library(shiny)
library(jsdemo)

ui <- fluidPage(
  titlePanel("reactR Input Example"),
  superselectInput("textInput"),
  textOutput("textOutput")
)

server <- function(input, output, session) {
  output$textOutput <- renderText({
    sprintf("You entered: %s", input$textInput)
  })
}

shinyApp(ui, server)