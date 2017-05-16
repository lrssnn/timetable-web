import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

main = 
    Html.program
      { init = init
      , view = view
      , update = update
      , subscriptions = subscriptions
      }

type alias Bundle = 
    { day : String
    , time : String
    , name : String
    }

type Page = Input | Calendar

-- MODEL

type alias Model = 
    { bundles : List Bundle,
      page    : Page,
      text    : String
    }


init : (Model, Cmd Msg)
init =
    (Model [{day = "Tuesday", time = "11:00", name = "Booyakah"}] Input "", Cmd.none)

-- UPDATE

type Msg 
    = Select Bundle
    | Typing String
    | Switch Page


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Select bundle ->
            (model, Cmd.none)

        Typing text ->
            ({model | text = text}, Cmd.none)

        Switch page ->
            ({model | page = page}, Cmd.none)


-- VIEW

view : Model -> Html Msg
view model =
    div []
    [ viewPageSelectList
    ,(case model.page of
          Calendar -> viewCalendar model

          Input    -> viewInputForm model)]

viewPageSelectList : Html Msg
viewPageSelectList =
    div []
        [ a [onClick (Switch Input), href "#"] [text "Input | "]
        , a [onClick (Switch Calendar), href "#"] [text "Calendar"]
        ]

calendarTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
                 "16:00", "17:00", "18:00", "19:00"] 
calendarDays  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] 

-- Output the input form
viewInputForm : Model -> Html Msg
viewInputForm model =
    div [] [
      input [onInput Typing] []
    , strong [] [text model.text]
    ]

-- Output the calendar. The header function gets the days, then each row gets the model
-- and is mapped onto the times
viewCalendar : Model -> Html Msg
viewCalendar model =
    div []
      [ table [class "striped"]
          ([thead [] ([td [] [text ""]] 
            ++List.map viewCalHeader calendarDays)]
          ++ List.map (viewCalRow model) calendarTimes)
      ]

-- Output the header cell for a single day
viewCalHeader : String -> Html Msg
viewCalHeader day =
    td [] [text day]

-- Output a row of the calendar. First put the time label, then the cell function gets
-- each day, with the model and time being constants to that function
viewCalRow : Model -> String -> Html Msg
viewCalRow model time =
    tr [] ([
        td [] [strong [] [text time]]] ++ 
        (List.map (viewCalCell model time) calendarDays))

-- Output one cell in the table. Gets the time, day and the model and passes these
-- along to the contents function which builds the class list
viewCalCell : Model -> String -> String -> Html Msg
viewCalCell model time day =
    td [] [viewCellContents model time day]
    
-- Build the list of classes which start at the time and day given to the function
-- by using filter map
viewCellContents : Model -> String -> String -> Html Msg
viewCellContents model time day =
    ul [] (List.filterMap (getDayList time day) 
        model.bundles)

-- Returns an li for this bundle if it starts at the given timeslot
getDayList : String -> String -> Bundle -> Maybe (Html Msg)
getDayList time day bundle =
    if bundle.day == day && bundle.time == time then
        Just (li [onClick (Select bundle)] [text bundle.name])
        --Just (li [] [text bundle.name])
    else
        Nothing

subscriptions : Model -> Sub msg
subscriptions model = 
    Sub.none
