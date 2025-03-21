#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until wget -q --spider http://$host/api/ping || wget -q --spider http://$host; do
  >&2 echo "Drupal is unavailable - sleeping"
  sleep 2
done

>&2 echo "Drupal is up - executing command"
exec $cmd