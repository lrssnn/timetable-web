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

-- MODEL

type alias Model = 
    { bundles  : List Bundle
    }

init : (Model, Cmd Msg)
init =
    (Model [{day = "Tuesday", time = "11:00", name = "Booyakah"}], Cmd.none)

-- UPDATE

type Msg 
    = Select Bundle


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Select bundle ->
            (model, Cmd.none)


-- VIEW

view : Model -> Html Msg
view model =
    div []
      [viewCalendar model]


calendarTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
                 "16:00", "17:00", "18:00", "19:00"] 
calendarDays  = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] 

viewCalendar : Model -> Html msg
viewCalendar model =
    div []
      [ table [class "striped"]
          ([thead [] ([td [] [text ""]] ++ (List.map viewCalHeader calendarDays))]
        ++List.map (viewCalRow model) calendarTimes)
      ]

viewCalHeader : String -> Html msg
viewCalHeader day =
    td [] [text day]

viewCalRow : Model -> String -> Html msg
viewCalRow model time =
    tr [] ([
        td [] [strong [] [text time]]] ++ 
        (List.map (viewCalCell model time) calendarDays))

viewCalCell : Model -> String -> String -> Html msg
viewCalCell model time day =
    --td [] [text ("D: " ++ day), text (" T: " ++ time), text "|"]
    td [] [viewCellContents model time day]
    
viewCellContents : Model -> String -> String -> Html msg
viewCellContents model time day =
    ul [] (List.filterMap (getDayList time day) 
        model.bundles)

getDayList : String -> String -> Bundle -> Maybe (Html msg)
getDayList time day bundle =
    if bundle.day == day && bundle.time == time then
        Just (li [] [text bundle.name])
    else
        Nothing

type alias Bundle = 
    { day : String
    , time : String
    , name : String
    }

subscriptions : Model -> Sub msg
subscriptions model = 
    Sub.none
