docker run -v "$PWD":/pw-e2e -w /pw-e2e --rm -it mcr.microsoft.com/playwright:v1.54.2-noble

docker run -v "$PWD":/pw-e2e -w /pw-e2e --rm -it --entrypoint /bin/bash mcr.microsoft.com/playwright:v1.54.2-noble -c "npm run pw:test:headless:chrome"

docker run -v "$PWD":/pw-e2e -w /pw-e2e --rm -it pw-local:3.0

docker run -it --rm --ipc=host pw-local:3.0 /bin/bash

//--------

docker run -it -v "$PWD":/e2e -w /e2e cypress/included:cypress-14.5.4-node-22.18.0-chrome-139.0.7258.66-1-ff-141.0.3-edge-138.0.3351.121-1

docker run -it -v "$PWD":/e2e -w /e2e --entrypoint /bin/bash cypress/included:cypress-14.5.4-node-22.18.0-chrome-139.0.7258.66-1-ff-141.0.3-edge-138.0.3351.121-1

docker run -it -v "$PWD":/e2e -w /e2e --entrypoint /bin/bash cypress/included:cypress-14.5.4-node-22.18.0-chrome-139.0.7258.66-1-ff-141.0.3-edge-138.0.3351.121-1 -c "npm run cypress:run:headless:firefox"

docker run -it -v "$PWD":/e2e -w /e2e cypress/included:cypress-14.5.4-node-22.18.0-chrome-139.0.7258.66-1-ff-141.0.3-edge-138.0.3351.121-1 --browser firefox